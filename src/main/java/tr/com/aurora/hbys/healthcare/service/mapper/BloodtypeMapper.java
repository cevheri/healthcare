package tr.com.aurora.hbys.healthcare.service.mapper;


import tr.com.aurora.hbys.healthcare.domain.*;
import tr.com.aurora.hbys.healthcare.service.dto.BloodtypeDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Bloodtype} and its DTO {@link BloodtypeDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface BloodtypeMapper extends EntityMapper<BloodtypeDTO, Bloodtype> {



    default Bloodtype fromId(Long id) {
        if (id == null) {
            return null;
        }
        Bloodtype bloodtype = new Bloodtype();
        bloodtype.setId(id);
        return bloodtype;
    }
}
