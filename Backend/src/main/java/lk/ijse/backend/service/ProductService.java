package lk.ijse.backend.service;

import lk.ijse.backend.dto.ProductDTO;
import lk.ijse.backend.entity.Product;
import lk.ijse.backend.entity.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.math.BigDecimal;
import java.util.List;

public interface ProductService {
    ProductDTO createProduct(ProductDTO productDTO);
    ProductDTO updateProduct(Long id, ProductDTO productDTO);
    void deleteProduct(Long id);
    ProductDTO getProductById(Long id);
    Page<ProductDTO> getAllProducts(Pageable pageable);
    Page<ProductDTO> searchProducts(
            Long categoryId,
            Long brandId,
            String type,
            String size,
            BigDecimal minPrice,
            BigDecimal maxPrice,
            String query,
            Pageable pageable);
    List<ProductDTO> getLowStockProducts(Integer threshold);
    boolean updateStock(Long id, Integer quantity);
    List<ProductDTO> getProductsByCategory(Long categoryId);
    List<ProductDTO> getProductsByBrand(Long brandId);

    Product updateProductRating(Product product);

    // Call this method whenever a review is added, approved, or deleted
    void addReviewToProduct(Review review);

    void removeReviewFromProduct(Review review);
}