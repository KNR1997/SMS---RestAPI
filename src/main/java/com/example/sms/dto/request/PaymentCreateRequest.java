package com.example.sms.dto.request;

import com.example.sms.dto.Payment.PaymentItemCreateDTO;
import com.example.sms.enums.PayerType;
import com.example.sms.enums.PaymentMethod;
import lombok.Data;

import java.util.List;

@Data
public class PaymentCreateRequest {

    private PayerType payerType;

    private Integer payerId;

    private PayerType payeeType;

    private Integer payeeId;

    private Double totalAmount;

    private PaymentMethod paymentMethod;

    private String referenceNumber;

    private List<PaymentItemCreateDTO> paymentItemList;

}
