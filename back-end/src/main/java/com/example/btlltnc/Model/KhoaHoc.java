package com.example.btlltnc.Model;

import com.example.btlltnc.Base.BaseModel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "khoaHoc")
@NoArgsConstructor
@Getter
@Setter
public class KhoaHoc extends BaseModel {
    public String tenKH;
    public int soBuoi;
    public long hocPhi;
    public String moTa;
    public Boolean trangThai;
}
