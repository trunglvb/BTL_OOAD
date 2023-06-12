package com.example.btlltnc.Controller;

import com.example.btlltnc.Base.BaseController;
import com.example.btlltnc.Model.KetQua;
import com.example.btlltnc.Repository.KetQuaRespository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/ketQua")
@CrossOrigin(allowedHeaders = "*")
public class KetQuaController extends BaseController<KetQua,KetQuaRespository> {
    @Autowired
    public KetQuaRespository repository;

    @Override
    public KetQuaRespository get() {
        return repository;
    }
}
