package com.example.btlltnc.Controller;

import com.example.btlltnc.Base.BaseController;
import com.example.btlltnc.Model.LopHoc;
import com.example.btlltnc.Repository.LopHocRespository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping(value = "/lopHoc")
@CrossOrigin(allowedHeaders = "*")
public class LopHocController extends BaseController<LopHoc, LopHocRespository>{
    @Autowired
    public LopHocRespository repository;

    @Override
    public LopHocRespository get() {
        return repository;
    }
}
