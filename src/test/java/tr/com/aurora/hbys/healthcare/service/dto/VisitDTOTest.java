package tr.com.aurora.hbys.healthcare.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import tr.com.aurora.hbys.healthcare.web.rest.TestUtil;

public class VisitDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(VisitDTO.class);
        VisitDTO visitDTO1 = new VisitDTO();
        visitDTO1.setId(1L);
        VisitDTO visitDTO2 = new VisitDTO();
        assertThat(visitDTO1).isNotEqualTo(visitDTO2);
        visitDTO2.setId(visitDTO1.getId());
        assertThat(visitDTO1).isEqualTo(visitDTO2);
        visitDTO2.setId(2L);
        assertThat(visitDTO1).isNotEqualTo(visitDTO2);
        visitDTO1.setId(null);
        assertThat(visitDTO1).isNotEqualTo(visitDTO2);
    }
}
