package com.example.btlltnc.Controller;

import com.example.btlltnc.Base.BaseController;
import com.example.btlltnc.Model.DangKy;
import com.example.btlltnc.Model.GiaoVien;
import com.example.btlltnc.Repository.DangKyRespository;
import com.example.btlltnc.Repository.GiaoVienRespository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/dangKy")
@CrossOrigin(allowedHeaders = "*")
public class DangKyController extends BaseController<DangKy, DangKyRespository>{
    @Autowired
    public DangKyRespository repository;

    @Override
    public DangKyRespository get() {
        return repository;
    }
}

