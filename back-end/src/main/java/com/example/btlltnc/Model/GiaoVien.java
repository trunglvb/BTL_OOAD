package com.example.btlltnc.Model;

import com.example.btlltnc.Base.BaseModel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Table(name = "giaoVien")
@NoArgsConstructor
@Getter
@Setter
public class GiaoVien extends BaseModel {
    private String tenGV;
    private Date ngaySinhGV;
    private Boolean gioiTinhGV;
    private String sdtGV;
    private Boolean trangthai;

    @Column(name = "user_id")
    private long userId;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", insertable = false, updatable = false)
    private User user;
}
