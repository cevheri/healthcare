package tr.com.aurora.hbys.healthcare.service.mapper;


import tr.com.aurora.hbys.healthcare.domain.*;
import tr.com.aurora.hbys.healthcare.service.dto.CompanyDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Company} and its DTO {@link CompanyDTO}.
 */
@Mapper(componentModel = "spring", uses = {DepartmentMapper.class})
public interface CompanyMapper extends EntityMapper<CompanyDTO, Company> {


    default String fromName1(Company company){
        return "dfsdf";
    }
    default String fromName(Department company){
        return "dfsdf";
    }

    default Company fromId3(Long id) {
        if (id == null) {
            return null;
        }
        Company company = new Company();
        company.setId(id);
        return company;
    }
}
