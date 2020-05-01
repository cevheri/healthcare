package tr.com.aurora.hbys.healthcare.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import tr.com.aurora.hbys.healthcare.web.rest.TestUtil;

public class VisitServiceDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(VisitServiceDTO.class);
        VisitServiceDTO visitServiceDTO1 = new VisitServiceDTO();
        visitServiceDTO1.setId(1L);
        VisitServiceDTO visitServiceDTO2 = new VisitServiceDTO();
        assertThat(visitServiceDTO1).isNotEqualTo(visitServiceDTO2);
        visitServiceDTO2.setId(visitServiceDTO1.getId());
        assertThat(visitServiceDTO1).isEqualTo(visitServiceDTO2);
        visitServiceDTO2.setId(2L);
        assertThat(visitServiceDTO1).isNotEqualTo(visitServiceDTO2);
        visitServiceDTO1.setId(null);
        assertThat(visitServiceDTO1).isNotEqualTo(visitServiceDTO2);
    }
}
