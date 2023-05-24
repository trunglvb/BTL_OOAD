package com.example.btlltnc.Controller;

import com.example.btlltnc.Base.BaseController;
import com.example.btlltnc.Model.KhoaHoc;
import com.example.btlltnc.Repository.KhoaHocResponsitory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping(value = "/khoaHoc")
@CrossOrigin(allowedHeaders = "*")
public class KhoaHocContrroller extends BaseController<KhoaHoc, KhoaHocResponsitory> {
    @Autowired
    public KhoaHocResponsitory repository;

    @Override
    public KhoaHocResponsitory get() {
        return repository;
    }
}
