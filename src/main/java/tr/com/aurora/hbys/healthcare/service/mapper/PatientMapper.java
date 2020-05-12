package tr.com.aurora.hbys.healthcare.service.mapper;


import tr.com.aurora.hbys.healthcare.domain.*;
import tr.com.aurora.hbys.healthcare.service.dto.PatientDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Patient} and its DTO {@link PatientDTO}.
 */
@Mapper(componentModel = "spring", uses = {BloodtypeMapper.class})
public interface PatientMapper extends EntityMapper<PatientDTO, Patient> {

    @Mapping(source = "bloodtype.id", target = "bloodtypeId")
    @Mapping(source = "bloodtype.name", target = "bloodtypeName")
    PatientDTO toDto(Patient patient);

    @Mapping(source = "bloodtypeId", target = "bloodtype")
    Patient toEntity(PatientDTO patientDTO);

    default Patient fromId(Long id) {
        if (id == null) {
            return null;
        }
        Patient patient = new Patient();
        patient.setId(id);
        return patient;
    }
}
