package tr.com.aurora.hbys.healthcare.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

import tr.com.aurora.hbys.healthcare.domain.enumeration.VisitType;

/**
 * A Visit.
 */
@Entity
@Table(name = "visit")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Visit implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "date")
    private Instant date;

    @Enumerated(EnumType.STRING)
    @Column(name = "type")
    private VisitType type;

    @ManyToOne
    @JsonIgnoreProperties("visits")
    private Patient patient;

    @ManyToOne
    @JsonIgnoreProperties("visits")
    private Doctor doctor;

    @ManyToOne
    @JsonIgnoreProperties("visits")
    private Department department;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "visit_visit_service",
               joinColumns = @JoinColumn(name = "visit_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "visit_service_id", referencedColumnName = "id"))
    private Set<VisitService> visitServices = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getDate() {
        return date;
    }

    public Visit date(Instant date) {
        this.date = date;
        return this;
    }

    public void setDate(Instant date) {
        this.date = date;
    }

    public VisitType getType() {
        return type;
    }

    public Visit type(VisitType type) {
        this.type = type;
        return this;
    }

    public void setType(VisitType type) {
        this.type = type;
    }

    public Patient getPatient() {
        return patient;
    }

    public Visit patient(Patient patient) {
        this.patient = patient;
        return this;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }

    public Doctor getDoctor() {
        return doctor;
    }

    public Visit doctor(Doctor doctor) {
        this.doctor = doctor;
        return this;
    }

    public void setDoctor(Doctor doctor) {
        this.doctor = doctor;
    }

    public Department getDepartment() {
        return department;
    }

    public Visit department(Department department) {
        this.department = department;
        return this;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }

    public Set<VisitService> getVisitServices() {
        return visitServices;
    }

    public Visit visitServices(Set<VisitService> visitServices) {
        this.visitServices = visitServices;
        return this;
    }

    public Visit addVisitService(VisitService visitService) {
        this.visitServices.add(visitService);
        visitService.getVisits().add(this);
        return this;
    }

    public Visit removeVisitService(VisitService visitService) {
        this.visitServices.remove(visitService);
        visitService.getVisits().remove(this);
        return this;
    }

    public void setVisitServices(Set<VisitService> visitServices) {
        this.visitServices = visitServices;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Visit)) {
            return false;
        }
        return id != null && id.equals(((Visit) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Visit{" +
            "id=" + getId() +
            ", date='" + getDate() + "'" +
            ", type='" + getType() + "'" +
            "}";
    }
}
