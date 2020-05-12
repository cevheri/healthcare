package tr.com.aurora.hbys.healthcare.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import tr.com.aurora.hbys.healthcare.web.rest.TestUtil;

public class BloodtypeDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(BloodtypeDTO.class);
        BloodtypeDTO bloodtypeDTO1 = new BloodtypeDTO();
        bloodtypeDTO1.setId(1L);
        BloodtypeDTO bloodtypeDTO2 = new BloodtypeDTO();
        assertThat(bloodtypeDTO1).isNotEqualTo(bloodtypeDTO2);
        bloodtypeDTO2.setId(bloodtypeDTO1.getId());
        assertThat(bloodtypeDTO1).isEqualTo(bloodtypeDTO2);
        bloodtypeDTO2.setId(2L);
        assertThat(bloodtypeDTO1).isNotEqualTo(bloodtypeDTO2);
        bloodtypeDTO1.setId(null);
        assertThat(bloodtypeDTO1).isNotEqualTo(bloodtypeDTO2);
    }
}
