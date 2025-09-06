package com.mukkai;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class DeliveryApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(DeliveryApiApplication.class, args);
    }

    @GetMapping("/")
    public String home() {
        return "Mukkai Delivery API is running! 🍕";
    }

    @GetMapping("/health")
    public String health() {
        return "OK";
    }
}