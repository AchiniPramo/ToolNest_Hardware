package lk.ijse.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FinancialReportDTO {
    private LocalDate reportDate;
    private double totalIncome;
    private double totalExpenses;
    private double netProfit;
}