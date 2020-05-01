package tr.com.aurora.hbys.healthcare.service.dto;

import java.time.Instant;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import tr.com.aurora.hbys.healthcare.domain.enumeration.VisitType;

/**
 * A DTO for the {@link tr.com.aurora.hbys.healthcare.domain.Visit} entity.
 */
public class VisitDTO implements Serializable {
    
    private Long id;

    private Instant date;

    private VisitType type;


    private Long patientId;

    private String patientName;

    private Long doctorId;

    private String doctorName;

    private Long departmentId;

    private String departmentName;
    private Set<VisitServiceDTO> visitServices = new HashSet<>();
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getDate() {
        return date;
    }

    public void setDate(Instant date) {
        this.date = date;
    }

    public VisitType getType() {
        return type;
    }

    public void setType(VisitType type) {
        this.type = type;
    }

    public Long getPatientId() {
        return patientId;
    }

    public void setPatientId(Long patientId) {
        this.patientId = patientId;
    }

    public String getPatientName() {
        return patientName;
    }

    public void setPatientName(String patientName) {
        this.patientName = patientName;
    }

    public Long getDoctorId() {
        return doctorId;
    }

    public void setDoctorId(Long doctorId) {
        this.doctorId = doctorId;
    }

    public String getDoctorName() {
        return doctorName;
    }

    public void setDoctorName(String doctorName) {
        this.doctorName = doctorName;
    }

    public Long getDepartmentId() {
        return departmentId;
    }

    public void setDepartmentId(Long departmentId) {
        this.departmentId = departmentId;
    }

    public String getDepartmentName() {
        return departmentName;
    }

    public void setDepartmentName(String departmentName) {
        this.departmentName = departmentName;
    }

    public Set<VisitServiceDTO> getVisitServices() {
        return visitServices;
    }

    public void setVisitServices(Set<VisitServiceDTO> visitServices) {
        this.visitServices = visitServices;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        VisitDTO visitDTO = (VisitDTO) o;
        if (visitDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), visitDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "VisitDTO{" +
            "id=" + getId() +
            ", date='" + getDate() + "'" +
            ", type='" + getType() + "'" +
            ", patientId=" + getPatientId() +
            ", patientName='" + getPatientName() + "'" +
            ", doctorId=" + getDoctorId() +
            ", doctorName='" + getDoctorName() + "'" +
            ", departmentId=" + getDepartmentId() +
            ", departmentName='" + getDepartmentName() + "'" +
            ", visitServices='" + getVisitServices() + "'" +
            "}";
    }
}
