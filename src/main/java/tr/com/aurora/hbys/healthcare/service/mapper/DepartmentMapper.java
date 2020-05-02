package tr.com.aurora.hbys.healthcare.service.mapper;


import tr.com.aurora.hbys.healthcare.domain.*;
import tr.com.aurora.hbys.healthcare.service.dto.DepartmentDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Department} and its DTO {@link DepartmentDTO}.
 */
@Mapper(componentModel = "spring", uses = {CompanyMapper.class})
public interface DepartmentMapper extends EntityMapper<DepartmentDTO, Department> {

    @Mapping(source = "company.id", target = "companyId")
    @Mapping(source = "company.name", target = "companyName")
    DepartmentDTO toDto(Department department);

    @Mapping(target = "doctors", ignore = true)
    @Mapping(target = "removeDoctor", ignore = true)
    @Mapping(source = "companyId", target = "company")
    Department toEntity(DepartmentDTO departmentDTO);

    default Department fromId(Long id) {
        if (id == null) {
            return null;
        }
        Department department = new Department();
        department.setId(id);
        return department;
    }
}
