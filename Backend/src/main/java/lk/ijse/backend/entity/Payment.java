package lk.ijse.backend.entity;

import jakarta.persistence.*;
import lk.ijse.backend.enums.PaymentMethod;
import lk.ijse.backend.enums.PaymentStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "payments")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String paymentId;

    @OneToOne
    @JoinColumn(name = "orderId", nullable = false)
    private Order order;

    @Enumerated(EnumType.STRING)
    private PaymentMethod paymentMethod; // e.g., "CREDIT_CARD", "PAYHERE"

    private double amount;
    private LocalDateTime paymentDate;
    private String transactionId; // From PayHere Sandbox

    @Enumerated(EnumType.STRING)
    private PaymentStatus status; // e.g., "PAID", "UNPAID"
}