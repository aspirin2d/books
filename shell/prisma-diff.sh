#!/bin/bash

# 1. 设置目录
MIGRATIONS_DIR="./migrations"

# 2. 查找最新的 diff*.sql 文件编号
last_number=$(ls $MIGRATIONS_DIR/diff*.sql 2>/dev/null | sed -E 's/.*diff([0-9]+)\.sql/\1/' | sort -n | tail -n1)

# 如果没有文件，从0开始
if [ -z "$last_number" ]; then
  next_number=1
else
  next_number=$((last_number + 1))
fi

# 3. 设置输出文件名
output_file="$MIGRATIONS_DIR/diff${next_number}.sql"

# 4. 执行命令
echo "Generating migration diff: $output_file"
npx prisma migrate diff \
  --from-local-d1 \
  --to-schema-datamodel ./prisma/schema.prisma \
  --script \
  --output "$output_file"

echo "✅ Done: $output_file"
