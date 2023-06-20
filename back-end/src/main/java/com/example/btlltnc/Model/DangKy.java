package com.example.btlltnc.Model;

import com.example.btlltnc.Base.BaseModel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "dangKy")
@NoArgsConstructor
@Getter
@Setter
public class DangKy extends BaseModel {
    private boolean dongTien;

    @Column(name = "maHV")
    private Long maHV;

    @ManyToOne
    @JoinColumn(name = "maHV", referencedColumnName = "id", insertable = false, updatable = false)
    private HocVien hocVien;

    @Column(name = "maLH")
    private Long maLH;

    @ManyToOne
    @JoinColumn(name = "maLH", referencedColumnName = "id", insertable = false, updatable = false)
    private LopHoc lopHoc;

}
