package tr.com.aurora.hbys.healthcare.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import tr.com.aurora.hbys.healthcare.web.rest.TestUtil;

public class BloodtypeTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Bloodtype.class);
        Bloodtype bloodtype1 = new Bloodtype();
        bloodtype1.setId(1L);
        Bloodtype bloodtype2 = new Bloodtype();
        bloodtype2.setId(bloodtype1.getId());
        assertThat(bloodtype1).isEqualTo(bloodtype2);
        bloodtype2.setId(2L);
        assertThat(bloodtype1).isNotEqualTo(bloodtype2);
        bloodtype1.setId(null);
        assertThat(bloodtype1).isNotEqualTo(bloodtype2);
    }
}
