package com.example.btlltnc.Controller;

import com.example.btlltnc.Base.BaseController;
import com.example.btlltnc.Model.GiaoVien;
import com.example.btlltnc.Repository.GiaoVienRespository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping(value = "/giaoVien")
@CrossOrigin(allowedHeaders = "*")
public class GiaoVienController extends BaseController<GiaoVien, GiaoVienRespository>{
    @Autowired
    public GiaoVienRespository repository;

    @Override
    public GiaoVienRespository get() {
        return repository;
    }
}
