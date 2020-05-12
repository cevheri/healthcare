package tr.com.aurora.hbys.healthcare.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class BloodtypeMapperTest {

    private BloodtypeMapper bloodtypeMapper;

    @BeforeEach
    public void setUp() {
        bloodtypeMapper = new BloodtypeMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(bloodtypeMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(bloodtypeMapper.fromId(null)).isNull();
    }
}
