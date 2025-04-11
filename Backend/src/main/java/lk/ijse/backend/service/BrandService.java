package lk.ijse.backend.service;

import lk.ijse.backend.dto.BrandDTO;
import java.util.List;

public interface BrandService {
    BrandDTO createBrand(BrandDTO brandDTO);
    BrandDTO updateBrand(Long id, BrandDTO brandDTO);
    void deleteBrand(Long id);
    BrandDTO getBrandById(Long id);
    List<BrandDTO> getAllBrands();
    List<BrandDTO> getFeaturedBrands();
    BrandDTO getBrandByName(String name);
}