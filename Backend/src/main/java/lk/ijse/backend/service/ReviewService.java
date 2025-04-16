package lk.ijse.backend.service;

import lk.ijse.backend.dto.ReviewDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ReviewService {
    ReviewDTO createReview(ReviewDTO reviewDTO);
    ReviewDTO updateReview(Long id, ReviewDTO reviewDTO);
    void deleteReview(Long id);
    ReviewDTO getReviewById(Long id);
    Page<ReviewDTO> getReviewsByProduct(Long productId, Pageable pageable);
    Page<ReviewDTO> getPendingReviews(Pageable pageable);
    boolean approveReview(Long id);
    List<ReviewDTO> getReviewsByUser(String userEmail);
}