package com.example.btlltnc.Model;
import com.example.btlltnc.Base.BaseModel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Table;
import java.sql.Date;

@Entity
@Table(name = "ngayHoc")
@NoArgsConstructor
@Getter
@Setter
public class NgayHoc extends BaseModel{
    public String ngayHoc;
}
