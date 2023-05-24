package com.example.btlltnc.Model;

import com.example.btlltnc.Base.BaseModel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Table;
import java.sql.Date;

@Entity
@Table(name = "hocVien")
@NoArgsConstructor
@Getter
@Setter
public class HocVien extends BaseModel {
    private String tenHV;
    private Date ngaySinhHV;
    private Boolean gioiTinhHV;
    private String diaChiHV;
    private String sdtHV;
    private long UserID;
}
