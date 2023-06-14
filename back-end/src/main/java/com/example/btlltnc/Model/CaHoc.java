package com.example.btlltnc.Model;

import com.example.btlltnc.Base.BaseModel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "caHoc")
@NoArgsConstructor
@Getter
@Setter
public class CaHoc extends BaseModel{
    private String gioHoc;

}
