package lk.ijse.backend.dto;

import lk.ijse.backend.enums.ServiceType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ServiceBookingRequestDTO {
    private ServiceType serviceType;
    private Long vehicleId;
    private LocalDate date;
    private LocalTime time;
    private String notes;
}
