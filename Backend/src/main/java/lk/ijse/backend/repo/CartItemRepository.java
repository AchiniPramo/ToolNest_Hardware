package lk.ijse.backend.repo;

import lk.ijse.backend.entity.Cart;
import lk.ijse.backend.entity.CartItem;
import lk.ijse.backend.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    CartItem findByCartAndProduct(Cart cart, Product product);
}