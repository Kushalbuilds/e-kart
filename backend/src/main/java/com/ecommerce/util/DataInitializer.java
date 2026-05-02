package com.ecommerce.util;

import com.ecommerce.model.Product;
import com.ecommerce.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import java.util.Arrays;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private ProductRepository productRepository;

    @Override
    public void run(String... args) throws Exception {
        if (productRepository.count() == 0) {
            productRepository.saveAll(Arrays.asList(
                // Electronics
                new Product(null, "Premium Wireless Headphones", "Noise-cancelling over-ear headphones with 40h battery life.", 24999.00, "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80", "Electronics"),
                new Product(null, "Smartphone Pro Max", "The latest flagship smartphone with stunning 120Hz OLED display.", 89999.00, "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80", "Electronics"),
                new Product(null, "Ultra-Slim Laptop", "Powerful performance in a thin and light design for professionals.", 124999.00, "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&q=80", "Electronics"),
                
                // Accessories
                new Product(null, "Minimalist Watch", "Elegant sapphire crystal watch with leather strap.", 12500.00, "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80", "Accessories"),
                new Product(null, "Leather Travel Wallet", "Handcrafted leather wallet with RFID protection.", 3500.00, "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&q=80", "Accessories"),
                new Product(null, "Designer Sunglasses", "Classic aviator style with polarized lenses.", 8900.00, "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&q=80", "Accessories"),
                
                // Fitness
                new Product(null, "Smart Fitness Tracker", "Track your health and workouts with precision.", 6999.00, "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500&q=80", "Fitness"),
                new Product(null, "Adjustable Dumbbells", "Space-saving dumbbells for your home gym setup.", 18500.00, "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=500&q=80", "Fitness"),
                new Product(null, "Yoga Performance Mat", "Extra thick eco-friendly mat for maximum comfort.", 2499.00, "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&q=80", "Fitness"),
                
                // Photography
                new Product(null, "Professional Camera Lens", "Capture every detail with this high-end prime lens.", 45999.00, "https://images.unsplash.com/photo-1514996937319-344454492b37?w=500&q=80", "Photography"),
                new Product(null, "Mirrorless Cinema Camera", "Professional 4K video recording in a compact body.", 155000.00, "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80", "Photography"),
                new Product(null, "Carbon Fiber Tripod", "Lightweight and ultra-stable for landscape photography.", 14500.00, "https://images.unsplash.com/photo-1495707902641-75cac588d2e9?w=500&q=80", "Photography")
            ));
            System.out.println("Database seeded with premium products.");
        }
    }
}
