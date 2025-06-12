package com.example.sms.dto.Payment;

import com.example.sms.dto.request.PaymentCreateRequest;
import com.example.sms.enums.PayerType;
import com.example.sms.enums.PaymentMethod;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaymentCreateDTO {

    private PayerType payerType;

    private Integer payerId;

    private PayerType payeeType;

    private Integer payeeId;

    private Double totalAmount;

    private PaymentMethod paymentMethod;

    private String referenceNumber;

//    private List<PaymentItemCreateDTO> paymentItemCreateDTOList;

    public PaymentCreateDTO(PaymentCreateRequest paymentCreateRequest) {
        this.payerType = paymentCreateRequest.getPayerType();
        this.payerId = paymentCreateRequest.getPayerId();
        this.payeeType = paymentCreateRequest.getPayeeType();
        this.payeeId = paymentCreateRequest.getPayeeId();
        this.totalAmount = paymentCreateRequest.getTotalAmount();
        this.paymentMethod = paymentCreateRequest.getPaymentMethod();
        this.referenceNumber = paymentCreateRequest.getReferenceNumber();
//        this.paymentItemCreateDTOList = paymentCreateRequest.getPaymentItemList();
    }
}
