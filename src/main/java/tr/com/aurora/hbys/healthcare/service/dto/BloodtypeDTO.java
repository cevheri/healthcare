package tr.com.aurora.hbys.healthcare.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link tr.com.aurora.hbys.healthcare.domain.Bloodtype} entity.
 */
public class BloodtypeDTO implements Serializable {
    
    private Long id;

    private String name;

    private Integer code;

    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        BloodtypeDTO bloodtypeDTO = (BloodtypeDTO) o;
        if (bloodtypeDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), bloodtypeDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "BloodtypeDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", code=" + getCode() +
            "}";
    }
}
