package com.example.btlltnc.Model;

import com.example.btlltnc.Base.BaseModel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "ketQua")
@NoArgsConstructor
@Getter
@Setter
public class KetQua extends BaseModel {
    public int diem;

    @Column(name = "maHV")
    private long maHV;

    @ManyToOne
    @JoinColumn(name = "maHV", referencedColumnName = "id", insertable = false, updatable = false)
    private HocVien hocVien;

    @Column(name = "maLH")
    private long maLH;

    @ManyToOne
    @JoinColumn(name = "maLH", referencedColumnName = "id", insertable = false, updatable = false)
    private LopHoc lopHoc;
}
