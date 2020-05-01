package tr.com.aurora.hbys.healthcare.service.mapper;


import tr.com.aurora.hbys.healthcare.domain.*;
import tr.com.aurora.hbys.healthcare.service.dto.VisitServiceDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link VisitService} and its DTO {@link VisitServiceDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface VisitServiceMapper extends EntityMapper<VisitServiceDTO, VisitService> {


    @Mapping(target = "visits", ignore = true)
    @Mapping(target = "removeVisit", ignore = true)
    VisitService toEntity(VisitServiceDTO visitServiceDTO);

    default VisitService fromId(Long id) {
        if (id == null) {
            return null;
        }
        VisitService visitService = new VisitService();
        visitService.setId(id);
        return visitService;
    }
}
