package lk.ijse.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "financial_reports")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class FinancialReport {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String reportId;

    private LocalDate reportDate;
    private double totalIncome;
    private double totalExpenses;
    private double netProfit;
}