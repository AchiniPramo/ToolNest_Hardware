// Order.java
package lk.ijse.backend.entity;

import jakarta.persistence.*;
import lk.ijse.backend.enums.OrderStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String orderNumber;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Enumerated(EnumType.STRING)
    private OrderStatus status;

    private BigDecimal subtotal;

    private BigDecimal tax;

    private BigDecimal shippingCost;

    private BigDecimal discountAmount;

    private BigDecimal total;

    private String shippingFirstName;

    private String shippingLastName;

    private String shippingAddress;

    private String shippingAddress2;

    private String shippingCity;

    private String shippingState;

    private String shippingZipCode;

    private String shippingCountry;

    private String shippingPhone;

    private String billingFirstName;

    private String billingLastName;

    private String billingAddress;

    private String billingAddress2;

    private String billingCity;

    private String billingState;

    private String billingZipCode;

    private String billingCountry;

    private String billingPhone;

    private String paymentMethod;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItem> orderItems = new ArrayList<>();

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}