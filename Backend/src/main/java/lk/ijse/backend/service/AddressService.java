package lk.ijse.backend.service;

import lk.ijse.backend.dto.AddressDTO;

import java.util.List;

public interface AddressService {
    AddressDTO createAddress(String userEmail, AddressDTO addressDTO);

    AddressDTO updateAddress(Long addressId, AddressDTO addressDTO);

    void deleteAddress(Long addressId);

    AddressDTO getAddressById(Long addressId);

    List<AddressDTO> getUserAddresses(String userEmail);

    AddressDTO getUserDefaultAddress(String userEmail);

    AddressDTO setDefaultAddress(String userEmail, Long addressId);
}