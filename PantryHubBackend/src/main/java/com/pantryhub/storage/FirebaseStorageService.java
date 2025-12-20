package com.pantryhub.storage;


import com.google.cloud.storage.Blob;
import com.google.cloud.storage.Bucket;
import com.google.firebase.cloud.StorageClient;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

@Service
public class FirebaseStorageService {

    public String uploadFile(MultipartFile file) throws IOException {

        String originalFileName = file.getOriginalFilename();
        String extension = originalFileName != null ? originalFileName.substring(originalFileName.lastIndexOf(".")) : "";

        //this will create automatically create a "profile-image" folder in bucket
        String fileName = "profile-image/" + UUID.randomUUID().toString() + extension;

        // get default bucket
        Bucket bucket = StorageClient.getInstance().bucket();

        //upload the file
        Blob blob = bucket.create(fileName, file.getInputStream(), file.getContentType());

        //Generate the download link
        String downloadUrl = String.format(
                "https://firebasestorage.googleapis.com/v0/b/%s/o/%s?alt=media",
                bucket.getName(),
                // URI encode the path (replace / with %2F) so the browser reads it correctly
                fileName.replace("/", "%2F")
        );
        return downloadUrl;
    }
}
