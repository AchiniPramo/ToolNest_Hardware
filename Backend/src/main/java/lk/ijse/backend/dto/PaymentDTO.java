package lk.ijse.backend.dto;


import lk.ijse.backend.enums.PaymentMethod;
import lk.ijse.backend.enums.PaymentStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaymentDTO {
    private String orderId; // Reference to Order
    private PaymentMethod paymentMethod; // e.g., "CREDIT_CARD", "PAYHERE"
    private double amount;
    private LocalDateTime paymentDate;
    private String transactionId; // From PayHere Sandbox
    private PaymentStatus status; // e.g., "PAID", "UNPAID"
}