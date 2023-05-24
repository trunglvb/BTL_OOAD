package com.example.btlltnc.Model;

import com.example.btlltnc.Base.BaseModel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Table;
import java.sql.Date;

@Entity
@Table(name = "lopHoc")
@NoArgsConstructor
@Getter
@Setter
public class LopHoc extends BaseModel {
    private long maKH;
    private String tenLop;
    private Date ngayBD;
    private Date ngayKT;
    private int siSo;
    private long maGV;
    private long maCH;
    private long maNH;
    private String trangThai;

}
