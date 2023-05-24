package com.example.btlltnc.Controller;

import com.example.btlltnc.Base.BaseController;
import com.example.btlltnc.Model.HocVien;
import com.example.btlltnc.Repository.HocVienRespository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping(value = "/hocVien")
@CrossOrigin(allowedHeaders = "*")
public class HocVienController extends BaseController<HocVien, HocVienRespository>{
    @Autowired
    public HocVienRespository repository;

    @Override
    public HocVienRespository get() {
        return repository;
    }
}
