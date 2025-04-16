package lk.ijse.backend.service;

import lk.ijse.backend.dto.CartDTO;

public interface CartService {
    CartDTO getCartByUser(String userEmail);

    CartDTO addToCart(String userEmail, Long productId, Integer quantity);

    CartDTO updateCartItemQuantity(String userEmail, Long cartItemId, Integer quantity);

    CartDTO removeFromCart(String userEmail, Long cartItemId);

    CartDTO clearCart(String userEmail);

    CartDTO applyPromoCode(String userEmail, String promoCode);

    CartDTO removePromoCode(String userEmail);
}