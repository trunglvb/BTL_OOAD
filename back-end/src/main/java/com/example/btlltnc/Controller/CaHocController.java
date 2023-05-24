package com.example.btlltnc.Controller;

import com.example.btlltnc.Base.BaseController;
import com.example.btlltnc.Model.CaHoc;
import com.example.btlltnc.Repository.CaHocRespository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping(value = "/caHoc")
@CrossOrigin(allowedHeaders = "*")
public class CaHocController extends BaseController<CaHoc, CaHocRespository>{
    @Autowired
    public CaHocRespository repository;

    @Override
    public CaHocRespository get() {
        return repository;
    }
}
