package com.example.btlltnc.Model;

import com.example.btlltnc.Base.BaseModel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
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

    @Column(name = "user_id")
    private long userId;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", insertable = false, updatable = false)
    private User user;

    @Column(name = "khoaHoc_id")
    private Long KHId;

    @ManyToOne
    @JoinColumn(name = "khoaHoc_id", referencedColumnName = "id", insertable = false, updatable = false)
    private KhoaHoc khoaHoc;
}
