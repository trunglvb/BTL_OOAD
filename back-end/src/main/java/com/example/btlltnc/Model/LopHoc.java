package com.example.btlltnc.Model;

import com.example.btlltnc.Base.BaseModel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Table(name = "lopHoc")
@NoArgsConstructor
@Getter
@Setter
public class LopHoc extends BaseModel {
    private String tenLop;
    private Date ngayBD;
    private Date ngayKT;
    private int siSo;
    private String trangThai;

    @Column(name = "maKH")
    private Long maKH;

    @ManyToOne
    @JoinColumn(name = "maKH", referencedColumnName = "id", insertable = false, updatable = false)
    private KhoaHoc khoaHoc;

    @Column(name = "maGV")
    private Long maGV;

    @ManyToOne
    @JoinColumn(name = "maGV", referencedColumnName = "id", insertable = false, updatable = false)
    private GiaoVien giaoVien;

    @Column(name = "maCH")
    private Long maCH;

    @ManyToOne
    @JoinColumn(name = "maCH", referencedColumnName = "id", insertable = false, updatable = false)
    private CaHoc caHoc;

    @Column(name = "maNH")
    private Long maNH;

    @ManyToOne
    @JoinColumn(name = "maNH", referencedColumnName = "id", insertable = false, updatable = false)
    private NgayHoc ngayHoc;
}
