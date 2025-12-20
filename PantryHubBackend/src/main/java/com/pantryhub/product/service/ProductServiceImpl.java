package com.pantryhub.product.service;

import com.pantryhub.product.dto.request.ProductReqDto;
import com.pantryhub.product.dto.response.ProductResDto;
import com.pantryhub.category.entity.Category;
import com.pantryhub.product.entity.Product;
import com.pantryhub.product.entity.ProductStatus;
import com.pantryhub.product.mapper.ProductMapper;
import com.pantryhub.category.repository.CategoryRepository;
import com.pantryhub.product.repository.ProductRepository;
import com.pantryhub.storage.FirebaseStorageService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import static com.pantryhub.product.mapper.ProductMapper.*;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final FirebaseStorageService firebaseStorageService;
    private final CategoryRepository categoryRepository;

    @Override
    public List<ProductResDto> getAllActiveProduct() {
        List<Product> products = productRepository.findAllByStatus(ProductStatus.ACTIVE);
        return products.stream()
                .map(ProductMapper::mapToProductResDto)
                .collect(Collectors.toList());
    }

    @Override
    public ProductResDto getActiveProductById(Long id) {
        Product product = productRepository.findByStatusAndId(ProductStatus.ACTIVE, id);
        return mapToProductResDto(product);
    }

    @Override
    public List<ProductResDto> getSearchProduct(String name) {
        List<Product> products = productRepository.findByNameContainingIgnoreCase(name);
        return products.stream()
                .map(ProductMapper::mapToProductResDto)
                .collect(Collectors.toList());
    }

    //admin
    @Override
    public List<ProductResDto> getAllProducts() {
        List<Product> products = productRepository.findAll();
        return products.stream()
                .map(ProductMapper::mapToProductResDto)
                .collect(Collectors.toList());
    }

    @Override
    public ProductResDto createProduct(ProductReqDto productReqDto) {
        Category category = categoryRepository.findByIdAndIsActiveTrue(productReqDto.getCategoryId())
                .orElseThrow(() -> new EntityNotFoundException("Category Not Available For this"));

        Product product = productRepository.save(mapToProduct(productReqDto, category));
        return mapToProductResDto(product);
    }

    @Override
    public ProductResDto uploadProductImages(Long id, MultipartFile[] images) {

        if (images == null || images.length == 0) {
            throw new IllegalArgumentException("At least one image must be provided");
        }

        Product product = findProductById(id);

        if (product.getGalleryImages() == null)
            product.setGalleryImages(new ArrayList<>());

        List<String> uploadUrl = new ArrayList<>();

        Arrays.stream(images).forEach(file -> {
            String url = null;
            try {
                url = firebaseStorageService.uploadFile(file);
            } catch (IOException e) {
                throw new RuntimeException("No image upload successfully");
            }
            uploadUrl.add(url);
        });

        product.setImageUrl(uploadUrl.get(0)); // upload 1 image in imageUrl

        if (uploadUrl.size() > 1)
            product.getGalleryImages().addAll(uploadUrl.subList(1, uploadUrl.size())); // add rest all in gallary images

        Product saved = productRepository.save(product);

        return mapToProductResDto(saved);
    }

    @Override
    public ProductResDto updateProduct(Long id, ProductReqDto productReqDto) {

        Product product = findProductById(id);

        updateProductFromReqDto(productReqDto, product);

        Product updatedProduct = productRepository.save(product);

        return mapToProductResDto(updatedProduct);
    }

    @Override
    public ProductResDto toggleProductStatus(Long id) {

        Product product = findProductById(id);

        product.setIsActive(!product.getIsActive());

        Product afterToggleStatus = productRepository.save(product);

        return mapToProductResDto(afterToggleStatus);
    }

    @Override
    public List<ProductResDto> getProductByCategoryId(Long id) {
        List<Product> product = productRepository.findByCategoryId_IdAndIsActiveTrue(id);

        if (product.isEmpty())
            throw new EntityNotFoundException("Products Not Available For This Category!");

        return product.stream()
                .map(ProductMapper::mapToProductResDto)
                .collect(Collectors.toList());
    }

    private Product findProductById(Long id){
        return productRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Product Not Found: "+ id));
    }
}
