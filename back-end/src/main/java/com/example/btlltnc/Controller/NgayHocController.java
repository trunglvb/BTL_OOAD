package com.example.btlltnc.Controller;

import com.example.btlltnc.Base.BaseController;
import com.example.btlltnc.Model.NgayHoc;
import com.example.btlltnc.Repository.NgayHocRespository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping(value = "/ngayHoc")
@CrossOrigin(allowedHeaders = "*")
public class NgayHocController extends BaseController<NgayHoc, NgayHocRespository>{
    @Autowired
    public NgayHocRespository repository;

    @Override
    public NgayHocRespository get() {
        return repository;
    }
}
