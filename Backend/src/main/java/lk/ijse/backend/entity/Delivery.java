package lk.ijse.backend.entity;

import jakarta.persistence.*;
import lk.ijse.backend.enums.DeliveryStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "deliveries")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Delivery {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String deliveryId;

    @OneToOne
    @JoinColumn(name = "orderId", nullable = false)
    private Order order;

    private LocalDateTime deliveryDate;

    @Enumerated(EnumType.STRING)
    private DeliveryStatus deliveryStatus; // e.g., "PENDING", "IN_TRANSIT", "DELIVERED"

    private double distance; // in km
}