package tr.com.aurora.hbys.healthcare.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class PatientMapperTest {

    private PatientMapper patientMapper;

    @BeforeEach
    public void setUp() {
        patientMapper = new PatientMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(patientMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(patientMapper.fromId(null)).isNull();
    }
}
