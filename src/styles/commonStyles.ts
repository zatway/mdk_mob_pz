import {colors} from './colors.ts';

export const commonStyles = {
  container: {
    flex: 1,
  },
  containerCentered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textTertiary,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.divider,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: colors.backgroundLight,
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowSpaceBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
};
